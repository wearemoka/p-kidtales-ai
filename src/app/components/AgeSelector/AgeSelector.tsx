import { ages } from '@/app/services/constants/StoryParams'
import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'

interface Props {
    age: string,
    setAge: (age: string) => void
}

function AgeSelector ({ age, setAge }:Props) {
  return (
    <>
      <RadioGroup onChange={setAge} value={age} className='body-big' mb={3}>
        <Stack direction='row' justify='center' spacing={{ md: '20px', base: '10px' }}>
          {ages.map((age) => <Radio key={`age-option-${age}`} value={age}>{age} yrs</Radio>)}
        </Stack>
      </RadioGroup>

      <Box px={[0, 24, 24, 36]}>
        <Text className='caption text-center text-secondary'>Choosing the age for a story is important because it affects the length, language, and other aspects of the story.</Text>
      </Box>
    </>
  )
}

export default AgeSelector
