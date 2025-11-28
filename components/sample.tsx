"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useHousingContract } from "@/hooks/useContract"

const SampleIntegration = () => {
  const { isConnected } = useAccount()
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")

  const { data, actions, state } = useHousingContract()

  const handleAddHouse = async () => {
    if (!location || !price) return
    await actions.addHouse(location, price)
    setLocation("")
    setPrice("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">Housing Register</h1>

      {/* Add House */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="House Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="number"
          placeholder="Price (in FLR)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <button
          onClick={handleAddHouse}
          disabled={state.isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {state.isLoading ? "Adding..." : "Add House"}
        </button>
      </div>

      {/* House List */}
      <h2 className="text-xl font-bold mb-3">Registered Houses</h2>
      <div className="space-y-3">
        {data.houses.map((house) => (
          <div key={house.id} className="border p-4 rounded">
            <p><strong>ID:</strong> {house.id}</p>
            <p><strong>Location:</strong> {house.location}</p>
            <p><strong>Price:</strong> {house.price} FLR</p>
            <p><strong>Owner:</strong> {house.owner}</p>
          </div>
        ))}
      </div>

      {/* TX Status */}
      {state.hash && (
        <div className="p-4 mt-4 border rounded">
          <p>Tx Hash:</p>
          <p className="break-all">{state.hash}</p>
          {state.isConfirming && <p>Confirming...</p>}
          {state.isConfirmed && <p className="text-green-500">Confirmed!</p>}
        </div>
      )}

      {state.error && (
        <div className="p-4 mt-4 border border-red-500 rounded text-red-600">
          Error: {state.error.message}
        </div>
      )}
    </div>
  )
}

export default SampleIntegration



