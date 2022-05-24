using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface ITrailRepository
    {
        List<Trail> GetAllTrails();
        Trail GetTrailById(int id);
        void AddTrail(Trail trail);
        void UpdateTrail(Trail trail);
        void DeleteTrail(int id);
    }
}
