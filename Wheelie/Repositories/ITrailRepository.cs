using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface ITrailRepository
    {
        List<Trail> GetAllTrails();
        List<Trail> GetTrailsByBikerId(int id);
        Trail GetTrailById(int id);
        void AddTrail(Trail trail);
        void UpdateTrail(Trail trail);
        void DeleteTrail(int id);
    }
}
