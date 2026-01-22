import React, { ReactNode } from 'react'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container max-auto my-32">{children}</div>
  )
}
