import localFont from '@next/font/local';

// Font files can be colocated inside of `app`
const myFont = localFont({ src: '../public/robotocondensed-regular-webfont.woff2' });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={myFont.className}>
      <head></head>
      <body>{children}</body>
    </html>
  )
}
