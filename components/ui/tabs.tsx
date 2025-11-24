import * as React from "react"
// Simplified Tabs for MVP
export function Tabs({defaultValue, children, className}) { 
  const [active, setActive] = React.useState(defaultValue);
  return <div className={className} data-active={active}>{React.Children.map(children, child => React.cloneElement(child, {active, setActive}))}</div> 
}
export function TabsList({children, className}) { return <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>{children}</div> }
export function TabsTrigger({value, children, active, setActive, className}) { 
  return <button onClick={() => setActive(value)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${active === value ? 'bg-white shadow-sm text-foreground' : ''} ${className}`}>{children}</button> 
}
export function TabsContent({value, children, active}) { return active === value ? <div className="mt-2 ring-offset-background focus-visible:outline-none">{children}</div> : null }
