import * as InstructionCss from './Instruction.module.css'

const Instruction = props => {
    return (
    <div className={InstructionCss.Instruction}>
    <li>Username must be 6 characters long</li>    
    <li>Password Character should range from 6 to 12 characters</li>    
    <li>Password should include one UpperCase and a symbol</li>  
    </div>);
}

export default Instruction