import { MutableRefObject, useEffect, useRef, useState } from "react"

interface IUseNearScreen<T> {
  distance?: string
  externalRef?: React.MutableRefObject<T>
  once?: boolean
}

export function useNearScreen<T>({
  distance = "100px",
  externalRef,
  once = true
}: IUseNearScreen<T>) {
  const [isNearScreen, setShow] = useState<boolean>(false)
  const fromRef = useRef<MutableRefObject<T>>()

  useEffect(() => {
    if (!externalRef) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true)
            once && observer.disconnect()
          } else {
            !once && setShow(false)
          }
        })
      },
      { rootMargin: distance }
    )

    observer.observe(externalRef.current as Element)

    return () => observer.disconnect()
  }, [externalRef, once])

  // useEffect(() => {
  //   const element: HTMLElement = externalRef
  //     ? externalRef.current000
  //     : fromRef.current
  //   // const element = document.getElementById("visor")
  //   const onChange = (entries, observer) => {
  //     const el = entries[0]
  //     if (el.isIntersecting) {
  //       setShow(true)
  //       once && observer.disconnect()
  //     } else {
  //       !once && setShow(false)
  //     }
  //   }

  //   let observer = new IntersectionObserver(onChange, { rootMargin: "10px" })

  //   if (element !== undefined && element !== null) {
  //     observer.observe(element)
  //   }
  //   return () => observer && observer.disconnect()
  // })

  return { isNearScreen, fromRef }
}
