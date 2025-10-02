import { useEffect, useState } from 'react'
import '../App.css'
import PokeModal from './PokeModal'

const GetInfo = () => {
  const [pokemones, setPokemones] = useState([])
  const [isSelected, setIsSelected] = useState(null)
  const [search, setSearch] = useState("")

  const typeColors = {
    normal: "gray",
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "gold",
    ice: "aqua",
    fighting: "brown",
    poison: "purple",
    ground: "sienna",
    flying: "skyblue",
    psychic: "pink",
    bug: "olive",
    rock: "darkgray",
    ghost: "indigo",
    dragon: "orange",
    dark: "black",
    steel: "slategray",
    fairy: "violet",
  };

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=51')
        const data = await res.json()

        const detalles = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return await res.json()
          })
        )
        setPokemones(detalles)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPokemones()
  }, [])

  const openModal = (pokemon) => {
    setIsSelected(pokemon)
  }

  const closeModal = () => setIsSelected(null)

  return (
    <>
      <div className={`app-content ${isSelected ? "blurred" : ""}`}>
        <h1
          style={{
            textAlign: "center",
            margin: "20px auto",
            padding: "10px"
          }}>
          Buscador de Pokemones
        </h1>

        <input
          type='text'
          placeholder='Buscar pokemon'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          style={{
            display: "block",
            margin: "50px auto",
            padding: "10px",
            borderRadius: "8px",
            width: "250px",
            textAlign: "center",
            fontSize: "16px"
          }}
        />

        <div className="container">
          <div className="div-main">
            {pokemones
              .filter((p) => p.name.includes(search))
              .map((pokemon) => (
                <div
                  key={pokemon.id}
                  className='li-main'
                  onClick={() => openModal(pokemon)}
                >
                  <p className='pokemon-name'>
                    {pokemon.name} N.º 000{pokemon.id}
                  </p>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    style={{
                      fontFamily: 'Lucida Sans',
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                      margin: "10px"
                    }}
                  />
                  <p>Altura: {pokemon.height} mts</p>
                  <p>Peso: {pokemon.weight} kg</p>
                  <p>Habilidades: {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
                  <p className='p-tipo'>
                    Tipo: {pokemon.types.map((t, index) => (
                      <span
                        key={index}
                        style={{
                          color: "white",
                          backgroundColor: typeColors[t.type.name] || "black",
                          marginRight: "5px",
                          borderRadius: "20px",
                          padding: "5px"
                        }}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            {pokemones.filter((p) => p.name.includes(search)).length === 0 && (
              <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
                No se encontraron Pokemones.
              </p>
            )}
          </div>
        </div>
      </div>
      {isSelected && (
        <PokeModal
          pokemon={isSelected}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default GetInfo
