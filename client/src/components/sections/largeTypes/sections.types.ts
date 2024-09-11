export type Inputs = {
  name: string
  imgUrl: string
  description: string
  price: number
  type: string
  size: number
  madeToOrder: boolean
  colorOptions: number
  quantity: number
  materials: string[]
  yarnWeight: number
  _id?: string
}

export type EditFormProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void 
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
  inputs: Inputs
}