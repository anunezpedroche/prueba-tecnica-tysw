import { MutableRefObject, useEffect, useRef, useState } from "react"

interface IUseNearScreen<T> {
  distance?: string
  externalRef?: React.MutableRefObject<T | undefined>
  once?: boolean
}

export function useNearScreen<T>({
  distance = "100px",
  externalRef,
  once = true
}: IUseNearScreen<T>) {
  const [isNearScreen, setShow] = useState<boolean>(false)
  const fromRef = useRef<MutableRefObject<T | undefined>>()

  useEffect(() => {
    if (externalRef?.current === undefined) return
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

  return { isNearScreen, fromRef }
}
