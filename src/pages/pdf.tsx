import { useSelector } from "react-redux";
import { useCreatePdfMutation } from "../redux/api/pdfAPI";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../utils/features";

const PdfButton = () => {
    const { admin } = useSelector((state: RootState) => state.adminReducer);
    const adminId = admin?._id ?? "";
    const navigate = useNavigate();
    const [createPdf] = useCreatePdfMutation();
    const handleClick = async () => {
        try {
            const formData = {
                name: "Abhay",
            }
            const result = await createPdf({ formData, adminId: adminId });
            responseToast(result, navigate, "http://localhost:4000/api/v1/admin/download/receipt.pdf");
            console.log("PDF created successfully:", result);
        } catch (error) {
            console.error("Error creating PDF:", error);
        }
    };
    return (
        <button onClick={handleClick} >
            create pdf
        </button>
    );
};

export default PdfButton;
