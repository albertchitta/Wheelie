using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IBikeRepository
    {
        List<Bike> GetAllBikes();
        List<Bike> GetBikesByBikerId(int id);
        Bike GetBikeById(int id);
        void AddBike(Bike bike);
        void UpdateBike(Bike bike);
        void DeleteBike(int id);
    }
}
