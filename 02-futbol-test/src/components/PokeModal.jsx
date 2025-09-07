
 const PokeModal = ({pokemon, onClose}) => {
    //console.log({pokemon})
  return (
    <div style={styles.overlay}>
        <div style={styles.modal}>
            <button style={styles.close} onClick={onClose}>Cerrar</button>
            <p>{pokemon.name}</p>
            <div>
                <img src={pokemon.sprites.front_default}  style={{ width: "120px", height: "120px", objectFit: "contain", margin: "10px" }}/> 
                <img src={pokemon.sprites.front_shiny} style={{ width: "120px", height: "120px", objectFit: "contain", margin: "10px" }}/> 
                <p>stats</p>
                {pokemon.stats.map((statObj, index) => (
                    <div key={index}  
                        style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginBottom: "8px" 
                        }}>
                        <span style={{ width: "120px", textTransform: "capitalize", textAlign: "left"}}>{statObj.stat.name}: </span>
                        <div style={{ 
                            background: "#ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            width: "200px",
                            height: "15px",
                            marginLeft: "10px"
                        }}>
                        <div style={{
                            background: "#4caf50", // verde
                            width: `${statObj.base_stat > 100 ? 100 : statObj.base_stat}%`,
                            height: "100%"
                        }} />
                        </div>
                        <span style={{  width: "40px", textAlign: "right", marginLeft: '8px' }}>{statObj.base_stat}</span>
                    </div>
                ))}
            </div>
            <img />
        </div>
    </div>
  )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: "rgba(0,0,0,0.6)",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '15px',
        textAlign: 'center',
        position: 'relative',
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'red',
        color: "white",
        borderRadius: '50px',
        cursor: 'pointer',
        padding: '7px'
    }
}
export default PokeModal