import React from 'react'

    const Osa = (props) => <p>{props.nimi} {props.tehtavia}</p>
    const Otsikko = ({kurssi}) => <h1>{kurssi}</h1>
    const Sisalto = ({kurssi}) => {
    return(
        <div>
            {kurssi.osat.map(kurs => <Osa key={kurs.id} nimi={kurs.nimi} tehtavia={kurs.tehtavia} />)}
        </div>
    )
    }
    const Yhteensa = ({kurssi}) => {
        const yhteensa = kurssi.osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
        return(
            <p>yhteensä {yhteensa} tehtävää</p>
        )
    }

const Kurssit = ({kurssi}) => {

    
    return ( 
            <div>
                <Otsikko kurssi={kurssi.nimi} />
                <Sisalto kurssi={kurssi} />
                <Yhteensa kurssi={kurssi} />
            </div>
    )
}

export default Kurssit