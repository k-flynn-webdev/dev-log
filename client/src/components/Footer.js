import * as React from "react"

function Footer() {
  return (
    <div className="footer">
      <span>Made with</span>
      <svg viewBox="0 400 910 200" className="mx-1 icon:2">
        <path d="M730.084,312.85c4.226,113.133 -40.828,236.381 -79.883,320.702c-29.137,63.033 -92.165,103.467 -161.607,103.675c-58.148,0.184 -129.832,0.398 -188.066,0.573c-68.886,0.206 -131.752,-39.215 -161.569,-101.314c-43.597,-90.793 -96.522,-224.663 -88.059,-325.713"></path>
        <path d="M710,410.13l137.329,0c0,0 27.947,188.444 -226.001,233.406"></path>
      </svg>
      <span>by</span>
      <a
        rel="noreferrer"
        target="_blank"
        href="https://www.kubedev.co.uk"
        className="mx-1 link"
      >
        Kubedev
      </a>
    </div>
  )
}

export default Footer
