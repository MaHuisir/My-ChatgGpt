import "element-plus/dist/index.css";
import { ElContainer, ElHeader, ElButton, ElMain, ElDatePicker, ElConfigProvider, ElFooter, ElAside, ElTooltip, ElAvatar, ElImage } from "element-plus";


const elementArr = [ElContainer, ElHeader, ElButton, , ElMain, ElDatePicker, ElConfigProvider, ElFooter, ElAside, ElTooltip, ElAvatar, ElImage];

export default function element(app:any) {
  elementArr.forEach((item) => {
    app.use(item);
  });
}
