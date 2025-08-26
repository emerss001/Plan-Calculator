import { CheckCircle, FileSpreadsheet, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useUploadFile } from "../../../http/use-upload-exel";
import { useQueryClient } from "@tanstack/react-query";

interface ExcelUploadModalProps {
    isOpen: boolean;
    setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExcelUploadModal = ({ isOpen, setIsUploadModalOpen }: ExcelUploadModalProps) => {
    const queryClient = useQueryClient();
    const [file, setFile] = useState<File | null>(null);
    const { mutate, isPending, isSuccess } = useUploadFile();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) return null;

        mutate(
            { file },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["get-sales-clients"] });
                    setTimeout(() => {
                        setIsUploadModalOpen(false);
                    }, 1000);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <FileSpreadsheet className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Importar Vendas
                        </h3>
                    </DialogTitle>
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Selecione um arquivo Excel (.xlsx)</p>
                            <Input
                                type="file"
                                accept=".xlsx"
                                onChange={handleFileChange}
                                className="hidden"
                                id="excel-upload"
                            />
                            <Label
                                htmlFor="excel-upload"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                            >
                                Escolher Arquivo
                            </Label>
                        </div>
                    </div>

                    {file && (
                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-800 flex-1">{file.name}</span>
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">Vendas importadas com sucesso!</span>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsUploadModalOpen(false)}
                            className="flex-1 bg-transparent"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleUpload}
                            disabled={!file || isPending}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            {isPending ? "Processando..." : "Importar"}
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ExcelUploadModal;
