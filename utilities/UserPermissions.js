import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'


class UserPermissions {
    getCameraPermission = async () => {
        console.log("asking perms");
        if (Constants.platform.ios) {
            console.log("is ios");
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("We need permission to use your camera roll");
            }
        }
    }
}

export default new UserPermissions();