import AppLogoIcon from "./app-logo-icon"

export default function AppLogo() {
  return (
    <>
      <div className="bg-[#2D2926] text-white flex aspect-square size-8 items-center justify-center rounded-lg">
        <AppLogoIcon className="size-4" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-bold">
          PillPal
        </span>
      </div>
    </>
  )
}
