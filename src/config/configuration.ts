export default () => ({
    healthCheckMessage: "OK",
    internalServerErrorMessage: "Something went wrong",
});

export type publicConfigurationProps = {
    healthCheckMessage: string;
    internalServerErrorMessage: string;
};
