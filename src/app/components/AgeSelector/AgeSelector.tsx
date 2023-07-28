import { ages } from '@/app/services/constants/StoryParams'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {
  age: string,
  setAge: (age: string) => void,
  openOptions?: (option: boolean) => void
}

function AgeSelector ({ age, setAge, openOptions }:Props) {
  return (
    <>
      <RadioGroup
        onChange={(age) => {
          setAge(age)
        }}
        value={age} className='body-big' mb={3}
        onClick={() => {
          setTimeout(() => {
            openOptions && openOptions(false)
          }, 100)
        }}
      >
        <Stack direction='row' justify='center' spacing={{ md: '20px', base: '10px' }}>
          {ages.map((age) => <Radio key={`age-option-${age}`} value={age}>{age} yrs</Radio>)}
        </Stack>
      </RadioGroup>
    </>
  )
}

export default AgeSelector
