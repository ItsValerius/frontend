import localFont from '@next/font/local';
import "./globals.css"
// Font files can be colocated inside of `app`
const myFont = localFont({ src: './my-font.woff2' });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${myFont.className} h-full w-full`}>
      <head></head>
      <body className='h-full w-full'>{children}</body>
    </html>
  )
}
