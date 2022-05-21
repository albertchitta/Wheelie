using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface ITrailRepository
    {
        List<Trail> GetAllTrails();
        void AddTrail(Trail trail);
        void UpdateTrail(Trail trail);
        void DeleteTrail(Trail trail);
        Trail GetTrailById(int id);
    }
}
