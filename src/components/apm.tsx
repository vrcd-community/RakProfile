import Script from 'next/script'

export const APMComponent = () => {
  return (
    <>
      <Script>
        {`
          (function () {
            const script = document.createElement('script')

            script.src = 'https://ifs.imoe.xyz/static/rum.js'
            script.onload = function () {
              elasticApm.init({
                serviceName: 'vrcd-web-v2',
                serverUrl: '${process.env.ELASTIC_APM_SERVER_URL}',
              })
            }

            document.head.appendChild(script)
          })()
        `}
      </Script>
    </>
  )
}