using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IBikeRepository
    {
        List<Bike> GetAllBikes();
        void AddBike(Bike bike);
        void UpdateBike(Bike bike);
        void DeleteBike(Bike bike);
        Bike GetBikeById(int id);
    }
}
