type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="mx-auto h-screen flex justify-center items-center">{children}</div>
}
