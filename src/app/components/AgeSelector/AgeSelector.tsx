import { ages } from '@/app/services/constants/StoryParams'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {
    age: string,
    setAge: (age: string) => void
}

function AgeSelector ({ age, setAge }:Props) {
  return (
    <>
      <RadioGroup onChange={setAge} value={age} className='body-big' mb={3}>
        <Stack direction='row' justify='center' spacing={{ md: '20px', base: '10px' }}>
          {ages.map((age) => <Radio key={`age-option-${age}`} value={age}>{age} years</Radio>)}
        </Stack>
      </RadioGroup>
    </>
  )
}

export default AgeSelector
