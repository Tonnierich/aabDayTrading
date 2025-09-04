"use client"

import clsx from "clsx"
import { observer } from "mobx-react-lite"
import { standalone_routes } from "@/components/shared"
import Button from "@/components/shared_ui/button"
import useActiveAccount from "@/hooks/api/account/useActiveAccount"
import { useOauth2 } from "@/hooks/auth/useOauth2"
import { useApiBase } from "@/hooks/useApiBase"
import { useStore } from "@/hooks/useStore"
import { StandaloneCircleUserRegularIcon } from "@deriv/quill-icons/Standalone"
import { Localize, useTranslations } from "@deriv-com/translations"
import { Header, useDevice, Wrapper } from "@deriv-com/ui"
import { Tooltip } from "@deriv-com/ui"
import { AppLogo } from "../app-logo"
import AccountsInfoLoader from "./account-info-loader"
import AccountSwitcher from "./account-switcher"
import MobileMenu from "./mobile-menu"
import { getAppId } from "@/components/shared"
import "./header.scss"
import { useState } from "react"

const InfoIcon = () => {
  const [showModal, setShowModal] = useState(false)

  const socialLinks = [
    {
      name: "Telegram",
      url: "hacked",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0ZM17.94 8.19L15.98 17.03C15.82 17.67 15.42 17.83 14.88 17.52L11.88 15.33L10.44 16.71C10.27 16.88 10.12 17.03 9.79 17.03L10.02 13.97L15.61 8.9C15.87 8.67 15.56 8.54 15.22 8.77L8.21 13.31L5.24 12.38C4.62 12.19 4.61 11.74 5.38 11.43L17.08 7.08C17.6 6.9 18.06 7.23 17.94 8.19Z"
            fill="#229ED9"
          />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "tradeprofx9@gmail.com",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z"
            fill="#EA4335"
          />
        </svg>
      ),
    },
    {
      name: "Website",
      url: "testingall.pages.dev",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 14.45L16.95 8.5L15.53 7.08L11 11.61L8.71 9.32L7.29 10.74L11 14.45Z"
            fill="#4285F4"
          />
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#34A853"
            fillOpacity="0.2"
          />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqa3l0dGRPZ0NkV2RyeThVWEsxNmtNNHZ2UWpvd3xBQ3Jtc0ttekdrUDM3ZU1vYmR0LUJzM2t3UGYxekE3YTZYZXRvMjVYVVNONFJwZWdCdHRrT0xCV0pkb3VmWnNiT3VVaFo4RmNJM2F1dXRpWGpfd1JYUXJsMGR4Z084QVZzSXFibUt5VGtnRDZsYzR1WXRhQU43dw&q=https%3A%2F%2Fwww.tiktok.com%2F%40tradeprofx.pro%3F_t%3D8pOtdGbyKbG%26_r%3D1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16.6 5.82C15.9165 5.03962 15.5397 4.03743 15.54 3H12.45V15.4C12.4261 16.071 12.1428 16.7066 11.6597 17.1729C11.1766 17.6393 10.5316 17.8999 9.86 17.91C8.44 17.91 7.26 16.77 7.26 15.36C7.26 13.73 8.76 12.44 10.39 12.76V9.64C7.05 9.34 4.2 11.88 4.2 15.36C4.2 18.71 7 21.02 9.85 21.02C12.89 21.02 15.54 18.37 15.54 15.33V9.01C16.793 9.90985 18.2974 10.3926 19.84 10.39V7.3C19.84 7.3 17.96 7.39 16.6 5.82Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: "https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbUxXX3hiWXdpb2dXaDVrT0lqYURTS1Q2ZlVRUXxBQ3Jtc0ttYm1GSHRNUDBqTWZZcUNDNmk5c2RPZGVwU1oxMmZYVm1pTlg4UTY3UnBxakRzWVlIOW9XQmwwWXFtQWhFSWs0VWtjZ3dXOFczNFZ5VW9LSTBFZU1udWswbmJLcmRpUFhFMGVZQ1VtajdBMXpfVzBOSQ&q=https%3A%2F%2Fwa.me%2Fqr%2F63FRDYTJL46PH1",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.49 15.55 3.36 17.02L2.05 21.95L7.08 20.66C8.51 21.48 10.19 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.53 15.5C16.37 15.93 15.71 16.33 15.19 16.43C14.5 16.57 13.96 16.48 12.06 15.75C9.54 14.78 7.9 12.23 7.77 12.07C7.64 11.91 6.76 10.73 6.76 9.5C6.76 8.27 7.4 7.66 7.65 7.39C7.9 7.12 8.18 7.05 8.36 7.05C8.54 7.05 8.72 7.05 8.88 7.06C9.04 7.07 9.27 7 9.49 7.47C9.71 7.94 10.18 9.17 10.25 9.31C10.32 9.45 10.36 9.62 10.27 9.82C9.75 10.93 9.17 10.86 9.54 11.47C10.41 12.87 11.38 13.47 12.62 14.09C12.89 14.23 13.06 14.21 13.21 14.04C13.36 13.87 13.81 13.35 13.98 13.11C14.15 12.87 14.32 12.91 14.54 12.99C14.76 13.07 15.98 13.67 16.23 13.8C16.48 13.93 16.64 13.99 16.71 14.09C16.78 14.19 16.78 14.57 16.53 15.5Z"
            fill="#25D366"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCMDzH0sYbNcohLnx4wihG8Q",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#EF0000" />
          <polygon points="10,8 16,12 10,16" fill="white" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <button className="info-icon" onClick={() => setShowModal(true)}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base circle */}
          <circle cx="16" cy="16" r="16" fill="url(#chatGradient)" />

          {/* Message bubble */}
          <path
            d="M24 12C24 8.7 20.87 6 17 6H15C11.13 6 8 8.7 8 12C8 15.3 11.13 18 15 18H16V21L20 18C22.33 17.1 24 14.7 24 12Z"
            fill="white"
          />

          <defs>
            <linearGradient id="chatGradient" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </button>

      {showModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <div className="auth-modal__header">
              <h3>Connect With Us</h3>
              <button className="auth-modal__close-btn" onClick={() => setShowModal(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="auth-modal__content">
              <div className="social-links-modal">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span className="social-link__icon">{link.icon}</span>
                    <span className="social-link__name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const AppHeader = observer(() => {
  const { isDesktop } = useDevice()
  const { isAuthorizing, activeLoginid } = useApiBase()
  const { client } = useStore() ?? {}

  const { data: activeAccount, error: activeAccountError } = useActiveAccount({
    allBalanceData: client?.all_accounts_balance,
    shouldFetch: !!client,
  })

  const { accounts = {}, all_accounts_balance = {}, balance = 0, currency = "USD" } = client ?? {}

  const has_wallet = Object.values(accounts).some(
    (account) => account?.account_category === "wallet" && account?.is_active,
  )

  const { localize } = useTranslations()
  const { isOAuth2Enabled } = useOauth2()

  const renderAccountSection = () => {
    if (isAuthorizing) {
      return <AccountsInfoLoader isLoggedIn isMobile={!isDesktop} speed={3} />
    } else if (activeLoginid) {
      return (
        <>
          {isDesktop && (
            <>
              <Tooltip
                as="a"
                href={standalone_routes.personal_details}
                tooltipContent={localize("Manage account settings")}
                tooltipPosition="bottom"
                className="app-header__account-settings"
              >
                <StandaloneCircleUserRegularIcon className="app-header__profile_icon" />
              </Tooltip>
            </>
          )}
          <AccountSwitcher activeAccount={activeAccount} />
          {isDesktop &&
            (has_wallet ? (
              <Button
                className="manage-funds-button"
                has_effect
                text={localize("Manage funds")}
                onClick={() => window.location.assign(standalone_routes.wallets_transfer)}
                primary
              />
            ) : (
              <Button
                primary
                onClick={() => {
                  window.location.assign(standalone_routes.cashier_deposit)
                }}
                className="deposit-button"
              >
                {localize("Deposit")}
              </Button>
            ))}
        </>
      )
    } else {
      return (
        <div className="auth-actions">
          <Button
            tertiary
            onClick={() => {
              const app_id = getAppId()
              const oauth_url = "https://oauth.deriv.com/oauth2/authorize"
              const redirect_uri = encodeURIComponent(`${window.location.origin}/callback`)
              const url = `${oauth_url}?app_id=${app_id}&l=EN&brand=deriv&redirect_uri=${redirect_uri}`
              window.location.href = url
            }}
          >
            <Localize i18n_default_text="Log in" />
          </Button>
          <Button
            onClick={() => {
              window.location.href = "https://track.deriv.com/__rVf-VSveO71k0YPxVS0A2Nd7ZgqdRLk/1/"
            }}
          >
            <Localize i18n_default_text="Sign up" />
          </Button>
        </div>
      )
    }
  }

  return (
    <Header
      className={clsx("app-header", {
        "app-header--desktop": isDesktop,
        "app-header--mobile": !isDesktop,
      })}
    >
      <Wrapper variant="left">
        <AppLogo />
        <MobileMenu />
        <InfoIcon />
      </Wrapper>
      <Wrapper variant="right">{renderAccountSection()}</Wrapper>
    </Header>
  )
})

export default AppHeader
