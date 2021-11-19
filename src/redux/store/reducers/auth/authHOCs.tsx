import {FC} from 'react'
import {HocFCToFCType} from '../../../HOCTypes'
import {useAppSelector} from '../../../hooks/redux'


export const withToken: HocFCToFCType = (Component: FC<any>) => {
    const token: string | null = useAppSelector(state => state.authReducer.token)
    return (props) => <Component {...props} token={token}/>
}

export const withUserId: HocFCToFCType = (Component: FC<any>) => {
    const userId: string | null = useAppSelector(state => state.authReducer.token)
    return (props) => <Component {...props} userId={userId}/>
}
