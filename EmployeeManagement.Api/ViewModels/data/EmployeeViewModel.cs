using EmployeeManagement.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api.ViewModels.data
{
    public class EmployeeViewModel
    {
        public string Id { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Email { get; set; }=default!;
        public string PhoneNumber { get; set; } = default!;


        
        public string? HomeAddress { get; set; }
       
        public string? PermanentAddress { get; set; }
        
        public string? Picture { get; set; }
        [EnumDataType(typeof(MaritalStatus))]
        public MaritalStatus? MaritalStatus { get; set; }
        public DateTime? JoinDate { get; set; }
        
        public string? Department { get; set; }
        
        public string? CurrentPostion { get; set; }
        public string Roles { get; set; } = default!;
    }
}
