# frozen_string_literal: true

class MedicineScansController < InertiaController
  def new
  end

  def create
    image_data = params[:image]

    unless image_data.present?
      redirect_to new_medicine_scan_path, inertia: {errors: {image: "Please capture an image"}}
      return
    end

    result = extract_medication_info(image_data)
    render inertia: {scan_result: result}
  end

  private

  def extract_medication_info(base64_image)
    # Save base64 to a temp file for RubyLLM
    temp_file = Tempfile.new(["medicine_scan", ".jpg"])
    temp_file.binmode
    temp_file.write(Base64.decode64(base64_image))
    temp_file.rewind

    chat = RubyLLM.chat(model: "gemini-2.5-flash")

    response = chat.ask(
      "Extract medication information from this medicine label image. " \
      "Return ONLY a JSON object with these fields: " \
      '{"name": "medication name", "dosage": "dosage amount", "instructions": "usage instructions"}. ' \
      "If unclear, provide your best guess. Support English and Malay text. " \
      "Return ONLY the JSON, no other text.",
      with: temp_file.path
    )

    parse_llm_response(response.content)
  rescue => e
    Rails.logger.error("Medicine scan error: #{e.message}")
    {name: "", dosage: "", instructions: "", error: "Could not process image. Please enter details manually."}
  ensure
    temp_file&.close
    temp_file&.unlink
  end

  def parse_llm_response(content)
    json_match = content.match(/\{[^}]+\}/m)
    if json_match
      JSON.parse(json_match[0]).symbolize_keys.slice(:name, :dosage, :instructions)
    else
      {name: "", dosage: "", instructions: "", error: "Could not extract medication info"}
    end
  end
end
