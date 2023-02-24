using EmployeeManagement.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Api.HostedServices
{
    public class IdentityDbInitializer
    {
        private readonly AppDbContext db;
        private readonly UserManager<Employee> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public IdentityDbInitializer( UserManager<Employee> userManager, RoleManager<IdentityRole> roleManager, AppDbContext db)
        {
            //this.db = db;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.db = db;
            this.db.Database.EnsureCreated();
        }
        public async Task SeedAsync()
        {
           

            await CreateRoleAsync(new IdentityRole { Name = "Administrators", NormalizedName = "ADMINISTRATORS" });
            await CreateRoleAsync(new IdentityRole { Name = "Employees", NormalizedName = "EMPLOYEES" });


            var hasher = new PasswordHasher<Employee>();
            var user = new Employee { UserName = "admin", NormalizedUserName = "ADMIN" };
            user.PasswordHash = hasher.HashPassword(user, "@Open1234");
            user.Email = "admin@eyeelectronics.com";
            user.JobDetail = new JobDetail { Department = "Admin", CurrentPostion = "Head" };
            await CreateUserAsync(user, "Administrators");


            user = new Employee { UserName = "user1", NormalizedUserName = "USER1" };
            user.PasswordHash = hasher.HashPassword(user, "@mahi1234");
            await CreateUserAsync(user, "Employees");

        }
        private async Task CreateRoleAsync(IdentityRole role)
        {
            var exits = await roleManager.RoleExistsAsync(role.Name ?? "");
            if (!exits)
                await roleManager.CreateAsync(role);
        }
        private async Task CreateUserAsync(Employee user, string role)
        {
            var exists = await userManager.FindByNameAsync(user.UserName ?? "");
            if (exists == null)
            {
                await userManager.CreateAsync(user);
                await userManager.AddToRoleAsync(user, role);
            }

        }
       

    }
}
