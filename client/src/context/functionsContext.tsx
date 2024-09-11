import { createContext, useContext } from "react"

type FunctionProviderProps = {
  children: React.ReactNode
}

type FunctionContextType = {

}

const FunctionContext = createContext<FunctionContextType | undefined>(undefined)

export const FunctionProvider = ({children}: FunctionProviderProps) => {


  return <FunctionContext.Provider 
    value={{        
 
  }}
  >
    {children}
  </FunctionContext.Provider>
}

export const useFunction = (): FunctionContextType => {
  const context = useContext(FunctionContext);
  if (context === undefined) {
    throw new Error('useFunction must be used within an FunctionProvider');
  }
  return context;
};
