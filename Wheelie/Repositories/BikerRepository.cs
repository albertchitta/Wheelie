using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class BikerRepository : IBikerRepository
    {
        private readonly IConfiguration _config;

        public BikerRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Biker> GetAllBikers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               FirebaseUserId,
                                               [Role],
                                               [Name],
                                               Email,
                                               UserName,
                                               [Level],
                                               [Location],
                                               ImageUrl,
                                               Rides,
                                               Distance
                                        FROM Biker";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Biker> bikers = new List<Biker>();
                    while (reader.Read())
                    {
                        Biker biker = new Biker
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Role = reader.GetString(reader.GetOrdinal("Role")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Level = reader.GetString(reader.GetOrdinal("Level")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Rides = reader.GetInt32(reader.GetOrdinal("Rides")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance"))
                        };

                        bikers.Add(biker);
                    }

                    reader.Close();

                    Console.WriteLine(bikers);
                    return bikers;
                }
            }
        }
    }
}
