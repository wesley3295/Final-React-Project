import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ShowDiy = ({diy}) => {
    
const sup = JSON.parse(diy.supplies)
    return (
        <div>

            <div>
                <h3>{diy.title}</h3>
                <h6 key={diy.category.id}>Type:{diy.category.name}</h6>
            </div>

            <div>
                <ul>
                    Tools:
                    {diy.tools.map(t=>(<li key={t.id}>{t.name}</li>))}
                </ul>
            </div>

             <div>
                <ul>
                    Supplies:
                    {sup.map(s=>(<li>{s}</li>))}
                </ul>
            </div>

            <div>
                    <p>Intructions: {diy.instructions} </p>
            </div>
        </div>
    )
}

export default ShowDiy