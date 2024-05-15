import {useState} from 'react'

export default function Player({initialName,symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        // setIsEditing(isEditing ? false : true);
        // setIsEditing(!isEditing);
        setIsEditing((editing)=> !editing)

        if(isEditing){
            onChangeName(symbol,playerName);
        }
        
    }
    
    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    // let btnCaption = 'Edit';
    if(isEditing){
        editablePlayerName = <input type="text" requred value={playerName} onChange={handleChange}/>
        // btnCaption='Save';
    }
  return (
    <li className={isActive ? 'active': undefined}>
        <span className='player'>
            {/* {!isEditing && <span className='player-name'>{name}</span>}
            {isEditing && <input type="text" requred/>} */}
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        
        <button onClick={handleEditClick}>{isEditing ?  'Save' : 'Edit'}</button>
    </li>
  )
}
