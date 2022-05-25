using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IGearRepository
    {
        Gear GetGearById(int id);
        void AddGear(Gear gear);
        void DeleteGear(int id);
    }
}
