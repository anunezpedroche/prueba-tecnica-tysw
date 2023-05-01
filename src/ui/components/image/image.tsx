import { useState } from "react"
import defaultImg from "../../../assets/image_not_available.jpg"
export function Image({
  uri,
  alt,
  style
}: {
  uri: string | undefined
  alt: string
  style?: object
}) {
  const [src, setSrc] = useState(uri)

  const manageError = () => {
    setSrc(defaultImg)
  }

  return <img style={style} onError={manageError} src={src} alt={alt} />
}
