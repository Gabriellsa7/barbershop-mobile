import { BaseToast } from "react-native-toast-message";

export const toastConfig = {
  successPurple: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#8162FF",
        backgroundColor: "#251f42",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
      }}
      text2Style={{
        color: "#cfcfff",
        fontSize: 13,
      }}
    />
  ),
};
