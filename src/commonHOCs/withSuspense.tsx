import React, {FC, Suspense} from 'react'
import Loader from '../components/common/Loader/Loader'


export const withSuspense = (Component: FC<any>): FC => {
    return () => <Suspense fallback={<Loader size={36}/>}><Component/></Suspense>
}