export const ApiErrorHandler = {
    handle: async (response) => {
        var message = "";
        const error = true;
        try {
            const error = await response.json();
            var messages = "";
            if(error.errors) {
                messages = [...new Set(error.errors)];
                message = messages.join(" ");
            } else if(error.error) {
                message = error.message;
            }
        } catch (exception) {
            message = "Unexpected error " + response.status;
        } finally {
            return {error, message};
        }
    }
}