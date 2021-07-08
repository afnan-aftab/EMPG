import React, { useState, useRef, useCallback } from 'react'
import GetData from './GetData'

export default function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [size, setSize] = useState(7)
  let b = 0
  let arr = []

  const {
    pas,
    hasMore,
    error,
    loading
  } = GetData(size, pageNumber)

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        setSize(7)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  


  return (
    <>
      {pas.map((pass, index) => {
        if ((index+1)%7===0){
          let url = 'https://api.instantwebtools.net/v1/passenger/'+String(pass._id)
          return (
            <>
              <div ref={lastElementRef} class="col-sm-12">
                <div class="h-300 card text-center">
                  <div class="card-body">
                    <div class="row">

                      <div class="col-sm-6">
                        <img class="bIm rounded img-fluid" src={pass.logo} alt="Logo"></img>
                  
                      </div>
                      <div class="col-sm-6">
                        <h4>{pass.country}</h4>
                        <br></br>
                        <p class="text-secondary">id: {pass.id}</p>
                        <h5>{pass.name}</h5>
                      </div>
                    </div>
                    <a href={url} target="_blank" rel="noreferrer" class="stretched-link"> </a>
                  </div>
                </div>
              </div>
              <br></br>
            </>
          )
        } else {
          if(b === 0)
          {
            arr[0] = pass
            b++
          } else {
            arr[1] = pass
            b = 0
            let url0 = 'https://api.instantwebtools.net/v1/passenger/'+String(arr[0]._id)
            let url1 = 'https://api.instantwebtools.net/v1/passenger/'+String(arr[1]._id)

            return (
              <>
                <div class="row">

                  <div class="col-sm-6">
                    <div class="card text-center">
                      <div class="card-body">
                        <img class="sIm rounded img-fluid" src={arr[0].logo} alt="Logo"></img>
                        
                        <h4>{arr[0].country}</h4>
                        <br></br>
                        <p class="text-secondary">id: {arr[0].id}</p>
                        <h5>{arr[0].name}</h5>
                        <a href={url0} target="_blank" rel="noreferrer" class="stretched-link"> </a>
    
    
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card text-center">
                      <div class="card-body">
                        <img class="sIm rounded img-fluid" src={arr[1].logo} alt="Logo"></img>
                        
                        <h4>{arr[1].country}</h4>
                        <br></br>
                        <p class="text-secondary">id: {arr[1].id}</p>
                        <h5>{arr[1].name}</h5>
                        <a href={url1} target="_blank" rel="noreferrer" class="stretched-link"> </a>
                      </div>
                    </div>
                  </div>

                </div>
                <br></br>
              </>
            )

          }
          return null
        }
      })} 
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}