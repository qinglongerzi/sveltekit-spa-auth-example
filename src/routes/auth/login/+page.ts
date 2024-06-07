export const load = async ({ parent }) => {
	// ensure layout load first
	await parent();
};
