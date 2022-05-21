using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IGearRepository
    {
        List<Gear> GetAllGear();
        void AddGear(Gear gear);
        void UpdateGear(Gear gear);
        void DeleteGear(Gear gear);
        Gear GetGearById(int id);
    }
}
