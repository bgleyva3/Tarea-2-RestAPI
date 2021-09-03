export const handleError = (error, request, response, next) => {
    response.status(400).json({
        message: "Hubo un error al procesar tu solicitud",
        errors: error.message
    });
}