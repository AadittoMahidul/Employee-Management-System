namespace EmployeeManagement.Api.HostedServices
{
    public class IdentityDbSeeder:IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        public IdentityDbSeeder(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<IdentityDbInitializer>();
            await seeder.SeedAsync();

        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
