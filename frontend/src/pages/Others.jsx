import React, { useEffect, useState } from 'react'

export default function Others() {
  const [products, setProducts] = useState([])

  useEffect(() => {

    const isSetLocal = localStorage.getItem('btcd_products')


    if (!isSetLocal) {
      fetch('https://raw.githubusercontent.com/Bit-Apps-Pro/products/main/lists.json')
        .then(response => response.json())
        .then(result => {
          if (result?.product) {
            setProducts(result.product)
            localStorage.setItem('btcd_products', JSON.stringify(result.product))
          }
        })
    } else {
      setProducts(JSON.parse(isSetLocal))
    }
  }, [])

  return (
    <div className=" btcd-inte-wrp txt-center">
      <div className="flx flx-center box">
        {products && products.map((product, i) => product.slug !== 'bit-smtp' && (
          <div
            key={`inte-sm-${i + 2}`}
            role="button"
            tabIndex="0"
            className={`btcd-inte-card inte-sm`}
          >
            {
              console.log('product', product)

            }
            <img loading="lazy" src={product.image} alt={product.slug} />
            <div className="txt-center px-2 f15">
              {product.name}
            </div>
            <br />
            <span className="btcd-inte-card-desc txt-center  text-overhide f-5" title={product.description}>{product.description}</span>
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