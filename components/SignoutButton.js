import React, {useContext} from "react"
import { Button } from "react-native";
import { signOut } from "api/auth";
import { UserContext } from "contexts";
export default function SignoutButton(){
    const {userAuth} = useContext(UserContext);
    return <Button
        title="Sign Out"
        onPress={async ()=> {
            await signOut();
    }}
        disabled={!userAuth}
    />
}