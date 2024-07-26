using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class ScheduleRequest
    {
        [Required]
        public string? rango {  get; set; }
    }
}
