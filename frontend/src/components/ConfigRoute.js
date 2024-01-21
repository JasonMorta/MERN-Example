import React, { useEffect } from 'react'

export default function ConfigRoute() {


    useEffect(() => {


        const fetchConfig = async () => {   
            try {
                const response = await fetch("http://localhost:8080/config");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('🚨',data)

            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchConfig()

    })

  return (
    <div>ConfigRoute</div>
  )
}
