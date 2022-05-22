import React, { useEffect, useState } from 'react'

export default function Others() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const newVersion = '1.0' 

    const oldVersion = localStorage.getItem('btcd_products_old_version')
    const isSetLocal = localStorage.getItem('btcd_products')
    

    if (oldVersion !== newVersion || !isSetLocal) {
      fetch('https://static.bitapps.pro/bitform/products.json')
      .then(response => response.json())
      .then(result => {
        const {version, data} = result
        if(data){
          setProducts(data)
          localStorage.setItem('btcd_products_old_version', version)
          localStorage.setItem('btcd_products', JSON.stringify(data))
        }
      })
    }else{
      setProducts(JSON.parse(isSetLocal))
     }
  }, [])

  return (
    <div className=" btcd-inte-wrp txt-center">
      <br/>
      <br/>
       <div className="flx flx-center box">
         {products && products.map((product, i) => (
            <div
                key={`inte-sm-${i + 2}`}
                role="button"
                tabIndex="0"
                className={`btcd-inte-card inte-sm mr-4 mt-3 `}
              >

              <img loading="lazy" src={product.icon_url} alt={product.slug} />
              <div className="txt-center text-overhide px-2 f15">
                {product.name}
              </div>
              <br/>
              <div className="txt-center f-5">
                <span className="btcd-inte-card-desc">{product.description}</span>
              </div>
              <div className="flx flx-center">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btcd-btn-o-blue btcd-btn-sm">
                  <i className="fas fa-external-link-alt"></i>
                  <span className="pl-1">Go to plugin</span>
                </a>
              </div>
          </div>
          ))}
  </div>
    </div>
   
  )
}