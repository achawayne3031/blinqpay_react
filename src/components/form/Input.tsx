import { ChangeEvent, FC, useState } from 'react'
import '../../styles/form-component.scss'
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'file'
  label: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  errorText: string | React.ReactElement | any
  disabled?: boolean
  showPasswordIcon?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}




const Input: FC<InputProps> = ({
    type,
    label,
    value,
    name,
    placeholder,
    error,
    errorText,
    disabled,
    showPasswordIcon = false,

    onChange,
  }) => {

    const [ showPasswordState, setShowPasswordState] = useState(false)
    const [ passwordType, setPasswordType] = useState('text')
    //const [ showIcon, setShowIcon] = useState(false)

    const changePassword = () => {

      setShowPasswordState(!showPasswordState)
      if(showPasswordState){
        setPasswordType('text')

      }else{  
        setPasswordType('password')

      }


    }

    return (
      <div className="input-wrapper">
        <label htmlFor={label} className='input-label'>{label}</label>

        {
          showPasswordIcon ? 

            <>
                <input
                  type={passwordType}
                  id={label}
                  value={value}
                  name={name}
                  placeholder={placeholder}
                  onChange={onChange}
                  disabled={disabled}
                  className='input-text'
                />

                {/* { Boolean(showPasswordState) ? <><VisibilityOffIcon className='eye-icon' onClick={changePassword} /></> : <><VisibilityIcon className='eye-icon' onClick={changePassword} /></> } */}

            </>
        

        : 
        <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className='input-text'
      />


        }

       





        {Boolean(error && errorText)  && <><p className="error"> <InfoIcon className='error-icon' /> { errorText }</p></> }
      </div>
    )
  }
  
  export default Input